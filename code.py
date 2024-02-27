import board
import neopixel
import time

# Update this to match the number of NeoPixel LEDs conected to your board.
num_pixels = 6

pixels = neopixel.NeoPixel(board.GP0, num_pixels)
pixels.brightness = 0.5

def main():
    while True:
        pixels[0] = (255, 0, 0)
        pixels[1] = (0, 255, 0)
        pixels[3] = (0, 0, 255)
        pixels[4] = (100, 100, 100)
        pixels[5] = (0, 10, 0)
        time.sleep(0.5)

main()