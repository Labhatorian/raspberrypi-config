# Raspberry Pi Configuration files
This repository contains Docker Compose configurations for setting up Pi-hole with a modified lighttpd configuration, along with an Nginx setup that acts as a reverse proxy for Pi-hole and serves a customized landing page.

## Contents:
1. **Pihole**:
   - Docker Compose configuration for Pi-hole with a customized lighttpd configuration altering the port for Nginx compatibility.

2. **Nginx**:
   - Docker Compose setup including:
     - Default configuration files to proxy Pi-hole.
     - An index page displayed upon accessing the IP, based on the Dutch Police Blackbox Security seized page.
       - Integration of a script to read `neofetch` output from a text file and display it on the landing page.

3. **Neofetch Cron Job**:
   - File containing the cron job command responsible for executing `neofetch` every minute. The output, in ANSI format, is saved in the `html_files` directory alongside the index page.
