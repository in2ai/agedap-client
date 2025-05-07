pipeline {
    agent {
        docker {
            image 'node:18.19.0'
            args '-u root:root'
        }
    }
    stages {
        stage('Build: Install dependencies') {
            steps {
                sh '''#!/bin/bash
                    set -x  # Enables debug mode

                    apt-get update
                    apt-get install -y nodejs
                    npm install -g @angular/cli@latest
                '''

                //Install chrome browser
                sh '''#!/bin/bash
                    set -x  # Enables debug mode

                    apt-get update
                    apt-get install -y wget unzip
                    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
                    dpkg -i google-chrome-stable_current_amd64.deb || true
                    apt-get install -f -y
                '''

                // Set the CHROME_BIN environment variable to the path of the Chrome binary
                script {
                    env.CHROME_BIN = '/usr/bin/google-chrome'
                    echo "CHROME_BIN set to ${env.CHROME_BIN}"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Check if the build is triggered by a pull request
                    if (env.CHANGE_ID) {
                        echo "Building pull request #${env.CHANGE_ID}"
                    } else {
                        echo "Building branch ${env.BRANCH_NAME}"
                    }
                }
                sh 'npm install --force'
                sh 'npm run build-pro'
            }
        }

        stage('Test') {
            steps {
                script {
                    // Check if the build is triggered by a pull request
                    if (env.CHANGE_ID) {
                        echo "Running tests for pull request #${env.CHANGE_ID}"
                    } else {
                        echo "Running tests for branch ${env.BRANCH_NAME}"
                    }
                }
                sh 'ng test --code-coverage'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Check if the build is triggered by a pull request
                    if (env.CHANGE_ID) {
                        echo "Skipping deployment for pull request #${env.CHANGE_ID}"
                    } else {
                        echo "Deploying branch ${env.BRANCH_NAME} (TO-DO)"
                        //sh 'npm run deploy'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/coverage/**', fingerprint: true
            junit '**/test-results/**/*.xml'
        }
    }
}
