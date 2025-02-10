## 📌 **PulseMQ-Panto Task - Production Setup Guide**  

To run this project in **production mode**, follow these steps carefully:  

### 🚀 **1. Setup Project on Server**  
Move the **Docker Compose** file to your server in a directory like `/app`:  
```bash
scp docker-compose.yml user@your-server:/app/
```

### 📂 **2. Place Configuration Files**  
Ensure the following files are inside `/app`:  
- `docker-compose.yml`
- `rabbitmq.conf`
- `.env` files  

### 🔧 **3. Setup Environment Files**  

#### **Main `.env` File**  
Move `.env.example` from the root of the **PulseMQ-Panto** repo and rename it as `.env` in `/app`:  
```bash
mv /path/to/PulseMQ-Panto/.env.example /app/.env
```

#### **Process Service `.process.env` File**  
Move `.env.example` from the **process** directory and rename it as `.process.env`:  
```bash
mv /path/to/PulseMQ-Panto/process/.env.example /app/.process.env
```

#### **Agent Service `.agent.env` File**  
Move `.env.example` from the **agent** directory and rename it as `.agent.env`:  
```bash
mv /path/to/PulseMQ-Panto/agent/.env.example /app/.agent.env
```

### 🔑 **4. Configure Environment Variables**  
Edit the `.env` files to set the desired values.

#### **Example `.agent.env`**  
```ini
AGENT_ID=test1
```

#### **Example `.process.env`**  
```ini
MONGO_URI=mongodb://mongo:27017/eventsDB

REDIS_HOST=redis
REDIS_PORT=6379

RABBITMQ_URL=amqp://user:password@rabbitmq:5672
RABBITMQ_QUEUE=test      
PORT=3000                        

RABBITMQ_QUEUE_DURABLE=0
```

### ✅ **5. Run the Service in Detached Mode**  
Start all services using Docker Compose:  
```bash
docker compose up -d
```

Now your services are running! 🎉 🚀
