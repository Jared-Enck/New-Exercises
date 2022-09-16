"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        """Create serial number starting at 100"""
        self.start = start
        self.first_instance = True

    def generate(self):
        """Generate new serial number incrementing from start"""
        if self.first_instance:
            self.first_instance = False
            return self.start

        self.start += 1
        return self.start

    def reset(self):
        """Resets serial number to start value 100"""
        self.start = 100
        self.first_instance = True



