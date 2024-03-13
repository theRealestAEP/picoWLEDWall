import ipaddress
import ssl
import wifi
import socketpool
import adafruit_requests
import os
import gc
import json


class WiFiController:

    def __init__(self):
        self._setup_wifi()
        self._setup_network()

    def _setup_wifi(self):
        for network in wifi.radio.start_scanning_networks():
            print("\t%s\t\tRSSI: %d\tChannel: %d" % (str(network.ssid, "utf-8"),
                                                     network.rssi, network.channel))

        wifi.radio.stop_scanning_networks()
        ssid = os.getenv("CIRCUITPY_WIFI_SSID")
        password = os.getenv("CIRCUITPY_WIFI_PASSWORD")

        print(f"Connecting to {ssid}")
        wifi.radio.connect(ssid, password)
        print(f"Connected to {ssid}!")
        print("My IP address is", wifi.radio.ipv4_address)

    def _setup_network(self):
        self.ipv4 = ipaddress.ip_address("8.8.4.4")
        print(f"Ping google.com: {wifi.radio.ping(self.ipv4) * 1000} ms")

        self.pool = socketpool.SocketPool(wifi.radio)
        self.requests = adafruit_requests.Session(self.pool, ssl.create_default_context())
        print("All set up! Ready to check the network.")
    
    def is_connected(self):
    # Assuming the wifi.radio has a property or method that can be used to check the connection.
    # You can use the ipv4_address attribute, if it's None or some default, then it's likely not connected.
        return wifi.radio.ipv4_address is not None
        
    def get_pending_actions(self):
        gc.collect()
        gc.mem_free()
        url = f"https://backend.removegreenscreen.com:8082/array"
        print(url)
        response = self.requests.get(url)

        # Process based on response status
        if response.status_code == 200:
            return response.json()
        elif 200 < response.status_code < 300:
            return None  # No content
        elif response.status_code == 400:
            raise InvalidInputException(response.text)
        elif response.status_code == 401:
            raise UnauthorizedException(response.text)
        elif response.status_code == 429:
            raise RateLimitedException(response.text)
        elif response.status_code == 500:
            raise InternalServerErrorException(response.text)
        else:
            # Handle unexpected event
            print("Unknown error occurred:", response.text)
            raise Exception(f"Unknown error occurred {response.text}")


#exception classes
class FailedToFetchException(Exception):
    gc.collect()
    pass

class UnauthorizedException(Exception):
    gc.collect()
    pass

class ResourceNotFoundException(Exception):
    gc.collect()
    pass

class RateLimitedException(Exception):
    gc.collect()
    pass

class InternalServerErrorException(Exception):
    gc.collect()
    pass

class InvalidInputException (Exception):
    gc.collect()
    pass