import board
import neopixel
import time
import gc
# import random
import wificontroller

# Update this to match the number of NeoPixel LEDs connected to your board.
num_pixels = 28

pixels = neopixel.NeoPixel(board.GP17, num_pixels)
pixelsBackup = neopixel.NeoPixel(board.GP16, num_pixels)
pixels.brightness = 0.1

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