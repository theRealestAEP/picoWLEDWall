# SPDX-FileCopyrightText: 2021 Kattni Rembor for Adafruit Industries
#
# SPDX-License-Identifier: MIT

"""
NeoPixel example for Pico. Turns the NeoPixels red.

REQUIRED HARDWARE:
* RGB NeoPixel LEDs connected to pin GP0.
"""
import board
import neopixel
import time
import random

# Update this to match the number of NeoPixel LEDs connected to your board.
num_pixels = 25

# wall = neopixel.NeoPixel(machine.Pin(pin), xres * yres)
# wall.write()
# from machine import Pin

pixels = neopixel.NeoPixel(board.GP17, num_pixels)
pixelsBackup = neopixel.NeoPixel(board.GP16, num_pixels)
pixels.brightness = 0.25

print(pixels)

wilford = [(0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (13, 0, 254), (16, 0, 251), (255, 0, 0), (255, 0, 0), (31, 0, 235), (13, 0, 254), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (20, 0, 247), (43, 0, 224), (255, 0, 0), (255, 0, 0), (34, 0, 233), (14, 0, 253), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (123, 0, 138), (130, 0, 131), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (110, 0, 152), (224, 0, 33), (255, 0, 0), (255, 0, 0), (229, 0, 27), (46, 0, 219), (245, 0, 10), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (158, 0, 102), (58, 0, 207), (101, 0, 162), (114, 0, 148), (90, 0, 173), (151, 0, 109), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (241, 0, 15), (195, 0, 63), (180, 0, 79), (205, 0, 52), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0)]
wilford2= [(255, 0, 0), (183, 97, 0), (254, 1, 0), (255, 0, 0), (255, 0, 0), (254, 0, 1), (77, 240, 0), (249, 8, 0), (80, 235, 1), (217, 50, 1), (119, 0, 146), (253, 0, 2), (255, 0, 0), (201, 72, 1), (58, 9, 205), (166, 0, 96), (33, 0, 236), (216, 0, 42), (21, 0, 252), (190, 0, 70), (252, 0, 3), (154, 0, 108), (25, 0, 246), (223, 0, 34), (255, 0, 0)]
while True:
    print("fill")
    # pixels[0] = (255, 0, 0)
    # time.sleep(1)
    # pixels[0] = (0, 255, 0)
    # time.sleep(1)
    # pixels.fill((255, 0, 0))
    # time.sleep(1)
    # pixels.fill((255, 255, 0))
    # time.sleep(1)
    # pixels.fill((0, 255, 0))    # time.sleep(1)
    for i in range(num_pixels):
        pixels[i] = wilford2[i]
        # pixels[i] = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        time.sleep(0.1)

    

    time.sleep(5)
    # for i in range(num_pixels-1, 0, -1):
    #     pixels[i] = (0, 0, 0)
    #     pixelsBackup[i] = (0, 0, 0)
    #     time.sleep(0.1)
    pixels.fill((0, 0, 0))    # pixels = wilford
    # pixels.fill((0, 255, 0))
    # time.sleep(1)
    # pixels.fill((0, 0, 255))
    # time.sleep(1)
    # pixels.fill((255, 0, 0))
    # time.sleep(1)


