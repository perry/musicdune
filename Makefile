PELICAN=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

S3BUCKET=s3://musicdune.com

help:
	@echo 'Makefile for a pelican Web site                                                '
	@echo '                                                                               '
	@echo 'Usage:                                                                         '
	@echo '   make html                        (re)generate the web site                  '
	@echo '   make clean                       remove the generated files                 '
	@echo '   make regenerate                  regenerate files upon modification         '
	@echo '   make build                       build using publish conf and compress html '
	@echo '   make gzip                        gzip all html + static text files          '
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
	java -jar build/htmlcompressor.jar --remove-quotes --remove-intertag-spaces --compress-js --type html -r -o $(OUTPUTDIR) $(OUTPUTDIR)

	# remove dotfiles
	# find $(OUTPUTDIR) -name '.*' -exec rm -rf {} \;
	rm -rf output/theme/.webassets-cache

gzip:
	find $(OUTPUTDIR)/ -iname '*.html' -exec gzip -n -f {} +
	find $(OUTPUTDIR)/ -iname '*.css' -exec gzip -n -f {} +
	find $(OUTPUTDIR)/ -iname '*.js' -exec gzip -n -f {} +
	for f in $$(find $(OUTPUTDIR)/ -iname '*.gz'); do mv -i "$$f" "$${f%%.gz}"; done
	find $(OUTPUTDIR)/ -iname 'sitemap.xml' -exec gzip -n -f {} +

deploy:
	make build
	make gzip

	# sync html with gzip but without cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Content-Encoding: gzip' --exclude '*.*' --include '*.html'

	# sync css and js with gzip and cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Content-Encoding: gzip' --add-header 'Cache-Control: max-age=31449600' --exclude '*.*' --include '*.js' --include '*.css'

	# sync everything else without gzip but with cache control
	s3cmd sync --progress -M --acl-public $(OUTPUTDIR)/ $(S3BUCKET)/ --add-header 'Cache-Control: max-age=31449600' --include '*.*' --exclude '*.js' --exclude '*.css' --exclude '*.html'

	# remove files that no longer exist
	# this has to be the last command as headers are set on the files above
	s3cmd sync --delete-removed $(OUTPUTDIR)/ $(S3BUCKET)/

	make clean

.PHONY: html help clean regenerate build deploy
