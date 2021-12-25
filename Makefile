SDIR	=	pages
ODIR	=	build
SRCS	:= $(shell find $(SDIR) -name '*.md')
OBJS	:= $(patsubst $(SDIR)/%,$(ODIR)/%,$(SRCS:.md=.ans))
EXEC	= /usr/bin/md
HEAD	= static/header.ans

all : $(OBJS)

$(ODIR)/%.ans: $(SDIR)/%.md $(HEAD)
	@mkdir -p $(@D)
	cat $(HEAD) > $@
	$(EXEC) $< >> $@

clean:
	rm -rf $(ODIR)

re: clean all

.PHONY: all clean re