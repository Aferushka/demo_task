FROM python:3.8

EXPOSE 8000

ENV PYTHONBUFFERED=1

WORKDIR /code

COPY . .

RUN chmod -R 777 /code && \
    pip3 install --no-cache-dir -r requirements.txt && \
    python3 manage.py collectstatic --no-input

ENV DJANGO_SETTINGS_MODULE demo_task_back.settings

CMD bash -c "python3 manage.py makemigrations && \
             python3 manage.py migrate --skip-checks && \
             python3 manage.py startserver localhost:8000"
