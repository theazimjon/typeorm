#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <time.h>
#include "my_mastermind.h"

void print_str(char *param_1)
{
    for (int i = 0; param_1[i] != '\0'; i++)
    {
        write(1, &param_1[i], 1);
    }
}

void str_copy(char *arg, char *code)
{
    for (int i = 0; i < 4; i++)
    {
        code[i] = arg[i];
    }
}

int check_code_input(char *str)
{
    if (strlen(str) != 4 && str[4] != '\n')
    {
        return 1;
    }

    for (int i = 0; i < 4; i++)
    {
        if (str[i] < 48 || str[i] > 55)
        {
            return 1;
        }
    }

    return 0;
}

void create_random_code(char *code)
{
    srand(time(0));
    for (int i = 0; i < 4; i++)
    {
        code[i] = (rand() % 8) + 48;
        write(1, &code[i], 1);
    }
}