#include <stdio.h>
#include <string.h>
#include <stdlib.h> // atoi
#include "my_mastermind.h"

GameState state;

int main(int ac, char **args)
{
    int user_code = 0;
    state.attempts = DEFAULT_ATTEMPS;

    for (int i = 1; i < ac; i++)
    {

        if (strcmp(args[i], "-c") == 0)
        {
            if (i + 1 >= ac)
            {
                printf("Error argument: please enter code after -c option\n");
                return 1;
            }
            if (check_code_input(args[i + 1]))
            {
                printf("Error: code input should be a valid number (0-8, 4 digits)\n");
                return 1;
            }

            str_copy(args[i + 1], state.code);

            user_code = 1;
            i++;
        }
        else if (strcmp(args[i], "-t") == 0)
        {
            if (i + 1 >= ac)
            {
                printf("Error argument: please enter attemps after -t option\n");
                return 1;
            }

            state.attempts = atoi(args[i + 1]);
            if (state.attempts < 1 || state.attempts > 50)
            {
                printf("Error argument: attempts must be between 1 and 100, otherwise there no way to enjoy this game :-)\n");
                return 1;
            }
            i++;
        }
        else
        {
            printf("Error argument: unknown option %s\n", args[i]);
            return 1;
        }
    }

    if (!user_code)
    {
        create_random_code(state.code);
    }

    my_mastermind(state.code, state.attempts);
}
