# Cloud-Based Web Application with CI/CD

## Architecture Design
![image](https://github.com/user-attachments/assets/e55bb20a-0fb8-481b-a539-7b87922ddeaa)

## CICD Pipeline
![image](https://github.com/user-attachments/assets/d4d80c7c-00e7-4868-9407-14a1f971de9d)


## Project Overview
This project is a cloud-native web application deployed on AWS EC2, designed with a fully automated CI/CD pipeline using Jenkins. The pipeline integrates SonarQube for static code analysis, automated builds, and seamless deployments, ensuring high code quality and security.

## Tech Stack
* Frontend: React (JavaScript), HTML, CSS
* Backend: Flask (Python)
* Database: MongoDB Atlas (NoSQL)
* Authentication: Firebase Authentication
* CI/CD: Jenkins, GitHub Webhooks
* Code Quality & Security: SonarQube
* Server & Deployment: AWS EC2, Gunicorn, Nginx
* Networking & Security: HTTPS (Certbot SSL), CSRF protection, CORS policies

## CI/CD Workflow
* Code Push to GitHub → Triggers Jenkins
* Jenkins Pipeline begins execution
* Fetch latest code
* Run SonarQube static analysis
* Build frontend assets
* Move frontend build to backend
* Install dependencies & set up virtual environment
* Restart application on AWS EC2
* Deployment with Gunicorn & Nginx

## Challenges Faced
Jenkins Permissions: EC2 required additional permission configurations for smooth pipeline execution.
SonarQube Optimization: Initial scans included unnecessary files, slowing down pipeline execution.
Security Considerations: CSRF protection needed to be properly configured without breaking API requests.
HTTPS & SSL Setup: Required setting up a custom domain, Certbot SSL, and Nginx to enforce secure communication.

## Key Learnings
CI/CD automation reduces deployment errors and speeds up software releases.
Static code analysis helps catch vulnerabilities early, improving security.
Nginx as a reverse proxy ensures seamless handling of HTTPS traffic and improves application stability.
Cloud-based authentication with Firebase simplifies user management while maintaining security best practices.
AWS EC2 Elastic IP ensures high availability, preventing disruptions during instance restarts.

## Future Enhancements
Migrate to AWS Cognito for authentication for better security.
Implement AWS CodeDeploy for streamlined CI/CD instead of Jenkins.
Introduce automated testing in the pipeline to catch issues earlier.
Optimize API security further by enforcing strict CORS policies and API gateway integration.

Sonarqube configuration in pipeline
![image](https://github.com/user-attachments/assets/28d47892-560c-4041-98f6-c8651746a39f)

Deploying app to prod in pipeline
![image](https://github.com/user-attachments/assets/59fffc39-ca7f-41ab-83ca-84990dcba64c)

Quality check pass in Jenkins
![image](https://github.com/user-attachments/assets/fd8fc8b5-3850-4654-a81d-73bd5f481dc9)

SQ tool analysis
![image](https://github.com/user-attachments/assets/f0119b72-0453-4a3c-b550-0e640e4d8e90)




