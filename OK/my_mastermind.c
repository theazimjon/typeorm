#include <stdio.h>
#include <unistd.h> // io
#include "my_mastermind.h"

void my_mastermind(char *code, int attempts)
{
    int user_attempts;

    printf("Will you find the secret code?\n---\n");

    for (user_attempts = 0; user_attempts < attempts; user_attempts++)
    {
        char buf[20];

        proceed_input(user_attempts, buf);

        if (get_well_pieces(code, buf) == 4)
        {
            print_str("Congrats! You did it!\n");
            user_attempts = -1;
            break;
        }

        int well_placed_pieces = get_well_pieces(code, buf);
        int miss_placed_pieces = get_missed_pieces(code, buf) - well_placed_pieces;

        printf("Well placed pieces: %d\nMisplaced pieces: %d\n---\n", well_placed_pieces, miss_placed_pieces);
    }

    if (user_attempts != -1)
        print_str("You lose it!\n");
}

void proceed_input(int i, char *buf)
{
    printf("Round %d \n", i);

    while (1)
    {
        int n;

        print_str(">");

        n = read(0, buf, 20);

        if (!check_code_input(buf) && n < 6)
            break;

        print_str("Wrong input!\n");
    }
}

int get_well_pieces(char *code, char *buf)
{
    int count = 0;

    for (int i = 0; i < 4; i++)
    {
        if (code[i] == buf[i])
        {
            count++;
        }
    }

    return count;
}

int get_missed_pieces(char *code, char *buf)
{
    int count = 0;

    for (int i = 0; i < 4; i++)
    {
        int c = 1;
        for (int j = 0; j < 4; j++)
        {
            if (code[i] == buf[j] && c)
            {
                count++;
                c = 0;
            }
        }
    }

    return count;
}