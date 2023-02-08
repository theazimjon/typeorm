CC = gcc
CFLAGS = -Wall -Wextra -Werror
target = my_mastermind
objects = main.o $(target).o utils.o

all = $(target)

$(target): $(objects)
	$(CC) ${objects} -o ${all} 

%.o: %.c
	${CC} ${CFLAGS} -c $<

post-build:
	rm -f ${objects}

clean:
	rm -f ${objects} $(target)