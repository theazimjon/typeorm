#ifndef MY_MASTERMIND_H
#define MY_MASTERMIND_H

#define DEFAULT_ATTEMPS 10 // define - macros

typedef struct GameState
{
    char code[5];
    int attempts;
} GameState;

void my_mastermind(char *code, int attempts);
void proceed_input(int i, char *buf);
int get_well_pieces(char *code, char *buf);
int get_missed_pieces(char *code, char *buf);
void print_str(char *param_1);
void str_copy(char *arg, char *code);
int check_code_input(char *str);
void create_random_code(char *code);

#endif // ifdef-endif header file guard