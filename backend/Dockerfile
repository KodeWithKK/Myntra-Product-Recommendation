FROM ghcr.io/astral-sh/uv:latest AS uv
FROM public.ecr.aws/lambda/python:3.11 AS builder

ENV UV_COMPILE_BYTECODE=1
ENV UV_NO_INSTALLER_METADATA=1
ENV UV_LINK_MODE=copy

COPY --from=uv /uv /bin/

WORKDIR /app

COPY requirements.txt .

# Install dependencies to the Lambda target directory
RUN uv pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

FROM public.ecr.aws/lambda/python:3.11

COPY --from=builder "${LAMBDA_TASK_ROOT}" "${LAMBDA_TASK_ROOT}"
COPY . "${LAMBDA_TASK_ROOT}"

CMD ["main.handler"]
