# RSVP - REST API


A simple implementation of a rsvp rest api.

## Installation

```
git clone https://github.com/htl-perg-2018-19-4ahif/rsvp-exercise-not-matthias.git
cd rsvp-exercise-not-matthias
npm install
```


## Usage

### REST API
```
npm run api
```

### Website
```
npm run web
```

### Both
```
npm start
```


## Docker Container

### Build the image
```docker
docker build -t not-matthias/rsvp-api .
```

### Run the image
```docker
docker run -p 8080:8080 -d not-matthias/rsvp-api

# Options: 
-p    Redirects a public port to a private port inside the container. (<public-port>:<private-port>)
-d    Runs the container in detached mode, leaving the container running in the background.
```

### Print docker processes
```docker
docker ps

# Example:
CONTAINER ID        IMAGE                   COMMAND             CREATED             STATUS              PORTS                    NAMES
4b1a86beee59        not-matthias/rsvp-api   npm run server    5 minutes ago       Up 5 minutes        0.0.0.0:8080->8080/tcp   wizardly_pascal
```

### Stop a docker process
```docker
docker stop <container-id>
```

or

```docker
docker stop <name>
```


### Print the output
```docker
docker logs <container-id>
```

or

```docker
docker logs <name>
```

