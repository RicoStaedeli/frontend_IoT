# Frontend IoT Project

This repository contains the frontend for the poop tracker dashboard. With this application it is possible to track the health of a cat. It is possible to capture feedings of a cat and also and also different cats. The dashboard gives you an overview of the weight of the different cats and the air quality on the cat toilet. 

The application is created with flask and the dashboard is mainly created with chart.js
Additionaly the application provides a notification feature over WhatsApp which is implemented with Twillio. 

## Hosting
The Application is hosted in Heroku and accessible with this [Link](https://pooptracker-8f3da93b6f96.herokuapp.com/)

## Installation
1. First of all create a virtual environement wit virtualenv. 
2. Clone the repository into that virtualenv
3. Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.txt.

```bash
pip install -r requirements.txt
```

## Run localy
Start the application localy
```bash
flask run 
```

## Code Description

The /static folder contains all files such as css, javaScript and the ressource for the application. The templates are all .html pages and the app.py contains the main part of the frontend. 
<br>


## Whatsapp Notification
To subscribe to the notification feed it is neccessary to initialy send a data to the whatsapp sandbox. To do that scan the QR-Code provided in the Poop Dashboard and send the generated message. Afterwards you will bi notificated as soon as your cat was on the toilet.