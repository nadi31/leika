FROM python:3.12

# Avoid writing .pyc files and ensure logs are immediately flushed
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set working directory inside the container
WORKDIR /leika/back

# Copy and install dependencies
COPY requirements.txt /leika/back/
RUN apt-get update && apt-get install -y --no-install-recommends \
        postgresql-server-dev-all \
        gcc \
        python3-dev \
        musl-dev && \
    python3 -m venv /leika/back/venv && \
    /leika/back/venv/bin/pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y postgresql-server-dev-all gcc python3-dev musl-dev && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Copy the application code
COPY . /leika/back/

RUN apt-get update && apt-get install -y bash
ENTRYPOINT ["/bin/bash", "-c", "python manage.py runserver 0.0.0.0:8000"]


