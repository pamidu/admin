FROM httpd:2.4
RUN mv /usr/local/apache2/htdocs/index.html /usr/local/apache2/htdocs/old_index.html
COPY ./index.html /usr/local/apache2/htdocs/index.html
