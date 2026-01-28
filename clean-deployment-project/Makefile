.PHONY: devnet start stop clean logs status

devnet:
@echo "🚀 Starting Midnight DevNet..."
docker-compose up -d
@echo "⏳ Waiting for services to start..."
sleep 10
@echo "✅ DevNet should be running!"
@echo "   Check status: make status"
@echo "   View logs: make logs"

start:
docker-compose start

stop:
docker-compose stop

clean:
docker-compose down -v
@echo "🧹 Cleaned up DevNet containers and volumes"

logs:
docker-compose logs -f

status:
docker-compose ps

restart: stop start
@echo "🔄 DevNet restarted"

health:
@echo "🔍 Checking DevNet health..."
@curl -s http://localhost:8042/health || echo "❌ Service not responding"
