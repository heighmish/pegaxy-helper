# Pegaxy Helper

The repository contains the source code for the website https://pegaxyhelper.io/

## Requirements

Project is written in react with material ui for styling. The website relies on a tensorflowjs deep learning model. The current one was created in python using keras and then converted using the tensorflowjs_convertor tool.

## Project Notes

The project currently uses the v1 apollo api provided by the Pegaxy team.

## Setup

The project was bootstraped using create-react-app.
To run a local copy clone the repo and then install and run with either yarn or npm.

## Files & Directories

Key files:

- The deep learning model is contained within public/javascript_model
- Functions used for converting data to a model compatible format and predicting are contained in src/util/model.js
