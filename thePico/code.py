import board
import neopixel
import time
import gc
# import random
import wificontroller

# Update this to match the number of NeoPixel LEDs connected to your board.
num_pixels = 256

# wall = neopixel.NeoPixel(machine.Pin(pin), xres * yres)
# wall.write()
# from machine import Pin

pixels = neopixel.NeoPixel(board.GP17, num_pixels)
pixelsBackup = neopixel.NeoPixel(board.GP16, num_pixels)
pixels.brightness = 0.1

# print(pixels)

# wilford = [(0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (13, 0, 254), (16, 0, 251), (255, 0, 0), (255, 0, 0), (31, 0, 235), (13, 0, 254), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (20, 0, 247), (43, 0, 224), (255, 0, 0), (255, 0, 0), (34, 0, 233), (14, 0, 253), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (123, 0, 138), (130, 0, 131), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (110, 0, 152), (224, 0, 33), (255, 0, 0), (255, 0, 0), (229, 0, 27), (46, 0, 219), (245, 0, 10), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (158, 0, 102), (58, 0, 207), (101, 0, 162), (114, 0, 148), (90, 0, 173), (151, 0, 109), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (241, 0, 15), (195, 0, 63), (180, 0, 79), (205, 0, 52), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0)]
# wilford2= [(255, 0, 0), (183, 97, 0), (254, 1, 0), (255, 0, 0), (255, 0, 0), (254, 0, 1), (77, 240, 0), (249, 8, 0), (80, 235, 1), (217, 50, 1), (119, 0, 146), (253, 0, 2), (255, 0, 0), (201, 72, 1), (58, 9, 205), (166, 0, 96), (33, 0, 236), (216, 0, 42), (21, 0, 252), (190, 0, 70), (252, 0, 3), (154, 0, 108), (25, 0, 246), (223, 0, 34), (255, 0, 0)]

def main():
    try:
        wifi = wificontroller.WiFiController()
        connected = True
    except Exception as e:
        # retries += 1
        connected = False
        print(f"Error occurred:{e}.")

    if connected:
        while True:
            print("getting pixels")
            gc.collect()
            gc.mem_free()
            try:
                response = wifi.get_pending_actions()
                # print(response)
                color_tuples = [tuple(map(int, color.split(', '))) if tuple(map(int, color.split(', '))) != (255, 255, 255) else (0, 0, 0) for color in response]

                # print(color_tuples)
                pixels[:] = color_tuples
                response = None
                color_tuples = None
                gc.collect()
                gc.mem_free()
            except Exception as e:
                response = None
                color_tuples = None
                print(f"Error occurred:{e}.")
                gc.collect()
                gc.mem_free()


            # pixels = color_tuples
            # pixels.fill(color_tuples)
            time.sleep(0.1)

main()