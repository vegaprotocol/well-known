# Set default to run all checks if none specified
.DEFAULT_GOAL := all

all: spellcheck markdownlint

# check the markdown formatting (/protocol specs only at this time)
.PHONY: markdownlint
markdownlint:
	@./markdownlint.sh

# check the markdown spelling (/protocol specs only at this time)
.PHONY: spellcheck
spellcheck:
	@./spellcheck.sh