PELICAN=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

S3BUCKET=s3://musicdune

help:
	@echo 'Makefile for a pelican Web site                                                '
	@echo '                                                                               '
	@echo 'Usage:                                                                         '
	@echo '   make html                        (re)generate the web site                  '
	@echo '   make clean                       remove the generated files                 '
	@echo '   make regenerate                  regenerate files upon modification         '
	@echo '   make build                       build using publish conf and compress html '
	@echo '   make deploy                      make build and sync files to s3            '
	@echo '                                                                               '


html: clean $(OUTPUTDIR)/index.html
	@echo 'Done'

$(OUTPUTDIR)/%.html:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

regenerate: clean
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

build: clean
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)
	java -jar build/htmlcompressor-1.5.3.jar --type html -r -o $(OUTPUTDIR) $(OUTPUTDIR)

deploy: build
	s3cmd sync --delete-removed $(OUTPUTDIR)/ $(S3BUCKET)/

	# sync html with gzip but without cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Content-Encoding:gzip' --exclude '*.*' --include '*.html'

	# sync css and jtml with gzip and cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Content-Encoding:gzip' --add-header 'Cache-Control: max-age=31449600' --exclude '*.*' --include '*.js' --include '*.css'

	# sync everything else without gzip but with cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Cache-Control: max-age=31449600' --include '*.*' --exclude '*.js' --exclude '*.css' --exclude '*.html'

.PHONY: html help clean regenerate build deploy
