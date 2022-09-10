words = ["hello", "hey","apple", "goodbye", "yo", "yes","ear", "even"]

# def all_uppercase(words):
#     """Takes a list of words and prints each word in uppercase"""
#     for word in words:
#         print(word.upper())

# all_uppercase(words)


# def all_uppercase(words):
#     """Takes a list of words and prints each word that starts with e or E in uppercase"""

#     for word in words:
#         if word.startswith('e') or word.startswith('E'):
#             print(word.upper())

# all_uppercase(words)


def all_uppercase(words, must_start_with=["a","e"]):
    """Takes a list of words and prints each word that starts the specified letters, in uppercase"""

    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
                break

all_uppercase(words)