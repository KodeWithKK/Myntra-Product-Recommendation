import os
import shutil
import subprocess
import zipfile

# Paths
base_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = base_dir
layer_dir = os.path.join(base_dir, "lambda_layer", "python")
zip_path = os.path.join(base_dir, "layer.zip")
requirements_path = os.path.join(base_dir, "requirements.txt")
pyproject_path = os.path.join(backend_dir, "pyproject.toml")

MAX_LAYER_SIZE_MB = 250


def run_command(command, cwd=None):
    print(f"▶ Running: {command}")
    result = subprocess.run(command, shell=True, cwd=cwd)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed: {command}")


def get_folder_size_mb(folder_path):
    total_size = 0
    for dirpath, _, filenames in os.walk(folder_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if os.path.isfile(fp):
                total_size += os.path.getsize(fp)
    return total_size / (1024 * 1024)


def zip_dir(source_dir, zip_file):
    print(f"📦 Creating ZIP: {zip_file}")
    with zipfile.ZipFile(zip_file, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source_dir):
            for file in files:
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, start=os.path.dirname(source_dir))
                zipf.write(filepath, arcname)
    print("✅ ZIP created successfully.")


def main():
    os.makedirs(layer_dir, exist_ok=True)

    # 1. Compile requirements.txt from pyproject.toml using uv
    print("📌 Compiling requirements.txt using uv...")
    run_command(
        f'uv pip compile "{pyproject_path}" --output-file "{requirements_path}"'
    )

    # 2. Install dependencies into lambda_layer/python
    print("📥 Installing dependencies with uv...")
    run_command(f'uv pip install -r "{requirements_path}" --target "{layer_dir}"')

    # 3. Check folder size before compression
    layer_size_mb = get_folder_size_mb(layer_dir)
    print(f"📁 lambda_layer/python size: {layer_size_mb:.2f} MB")

    if layer_size_mb > MAX_LAYER_SIZE_MB:
        print(f"❌ Folder size exceeds {MAX_LAYER_SIZE_MB} MB. Aborting.")
        shutil.rmtree(os.path.join(base_dir, "lambda_layer"), ignore_errors=True)
        raise SystemExit(1)

    # 4. Create ZIP file (layer.zip)
    zip_dir(layer_dir, zip_path)

    # 5. Report ZIP size
    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"📦 layer.zip size: {size_mb:.2f} MB")

    # ✅ 6. Delete requirements.txt
    if os.path.exists(requirements_path):
        os.remove(requirements_path)
        print("🧹 Deleted temporary requirements.txt")

    # 7. Cleanup lambda_layer directory
    print("🧹 Cleaning up temporary lambda_layer folder...")
    shutil.rmtree(os.path.join(base_dir, "lambda_layer"), ignore_errors=True)
    print("✅ Cleanup complete.")


if __name__ == "__main__":
    main()
