"""Word Finder: finds random words from a dictionary."""

from random import choice

class WordFinder:
    """    
        >>> wf = WordFinder("words.txt")
        235886

        >>> rando_word = wf.rando_word()

        >>> isinstance(rando_word, str)
        True

    """
    def __init__(self, file):
        """Calls read_file func on passed file"""
        self.opened_file = open(file, 'r')
        self.words = []
        self.read_file()
        print(len(self.words))

    def read_file(self):
        """Read file. Clean and append each word to list"""

        for line in self.opened_file:
            clean_line = line.strip()
            self.words.append(clean_line)

    def rando_word(self):
        """Returns random word from list of words"""

        return choice(self.words)


class SpecialWordFinder(WordFinder):
    """Removes comment lines and blank lines

    >>> spw = SpecialWordFinder('comments.txt')
    4

    >>> spw.rando_word() in ['kale','parsnips','apple','mango']
    True

    >>> spw.rando_word() in ['kale','parsnips','apple','mango']
    True

    >>> spw.rando_word() in ['kale','parsnips','apple','mango']
    True

    >>> spw.rando_word() in ['kale','parsnips','apple','mango']
    True

    """
    def __init__(self, file):
        super().__init__(file)

    def read_file(self):
        """Read and also filter out comments/blank lines. Then append word to list.
        
        """
        for line in self.opened_file:
            clean_line = line.strip()
            if clean_line and not line.startswith("#"):
                self.words.append(clean_line)