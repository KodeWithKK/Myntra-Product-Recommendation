FROM ghcr.io/astral-sh/uv:latest AS uv
FROM public.ecr.aws/lambda/python:3.11 AS builder

# Set uv environment variables for optimized installation
ENV UV_COMPILE_BYTECODE=1 \
  UV_NO_INSTALLER_METADATA=1 \
  UV_LINK_MODE=copy

COPY --from=uv /uv /bin/

WORKDIR /app

COPY requirements.txt .

# Install dependencies using uv and cache
RUN --mount=type=cache,target=/root/.cache/uv \
  uv pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

FROM public.ecr.aws/lambda/python:3.11

COPY --from=builder "${LAMBDA_TASK_ROOT}" "${LAMBDA_TASK_ROOT}"
COPY . "${LAMBDA_TASK_ROOT}"

CMD ["main.handler"]
