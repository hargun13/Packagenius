# import csv
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.common.keys import Keys
# import time

# # Initialize the Chrome webdriver
# driver = webdriver.Chrome()

# # Base URL of the webpage to scrape
# base_url = "https://www.pacdora.com/dielines"

# # Function to scroll to the bottom of the page
# def scroll_to_bottom():
#     # Scroll to the bottom of the page
#     driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
#     time.sleep(2)  # Add a short delay to allow the page to load more items

# # Function to scrape data
# def scrape_data(url):
#     driver.get(url)

#     # Wait for the data to be loaded
#     WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "list-item")))
    
#     # Scroll down multiple times until all items are loaded
#     for _ in range(10):  # Adjust the range according to the number of times you need to scroll down
#         scroll_to_bottom()

#     # Wait for the data to be loaded
#     WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "list-item")))

#     # Find all list items
#     items = driver.find_elements(By.CLASS_NAME, "list-item")

#     # Open the CSV file in write mode with newline='' to prevent extra newline characters
#     with open('scraped_data.csv', mode='w', newline='', encoding='utf-8') as file:
#         writer = csv.writer(file)

#         # Write headers
#         writer.writerow(['Mockup', 'Dieline', 'Title'])

#         # Iterate through the scraped data and write to CSV
#         for item in items:
#             # Find the image containers
#             image_containers = item.find_elements(By.CLASS_NAME, "image-container")

#             # Extract the image links
#             mockup_link = image_containers[0].find_element(By.TAG_NAME, "img").get_attribute("src")
#             dieline_link = image_containers[1].find_element(By.TAG_NAME, "img").get_attribute("src")

#             # Extract the title
#             title = item.find_element(By.CLASS_NAME, "title").text

#             writer.writerow([mockup_link, dieline_link, title])

# # Scrape data from the base URL
# scrape_data(base_url)

# # Close the webdriver
# driver.quit()




# import csv
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.common.keys import Keys
# import time

# # Initialize the Chrome webdriver
# driver = webdriver.Chrome()

# # Base URL of the webpage to scrape
# base_url = "https://www.pacdora.com/dielines"

# # Function to scroll to the bottom of the page
# def scroll_to_bottom():
#     # Scroll to the bottom of the page
#     driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
#     time.sleep(2)  # Add a short delay to allow the page to load more items

# # Function to scrape data
# def scrape_data(url):
#     driver.get(url)

#     # Scrape multiple pages
#     while True:
#         # Wait for the data to be loaded
#         WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "list-item")))

#         # Scroll down multiple times until all items are loaded
#         for _ in range(10):  # Adjust the range according to the number of times you need to scroll down
#             scroll_to_bottom()

#         # Find all list items
#         items = driver.find_elements(By.CLASS_NAME, "list-item")

#         # Open the CSV file in write mode with newline='' to prevent extra newline characters
#         with open('scraped_data.csv', mode='a', newline='', encoding='utf-8') as file:
#             writer = csv.writer(file)

#             # Write data to CSV
#             for item in items:
#                 # Find the image containers
#                 image_containers = item.find_elements(By.CLASS_NAME, "image-container")

#                 # Extract the image links
#                 mockup_link = image_containers[0].find_element(By.TAG_NAME, "img").get_attribute("src")
#                 dieline_link = image_containers[1].find_element(By.TAG_NAME, "img").get_attribute("src")

#                 # Extract the title
#                 title = item.find_element(By.CLASS_NAME, "title").text

#                 writer.writerow([mockup_link, dieline_link, title])

#         # Find the pagination button without the "flip" class
#         next_button = driver.find_element(By.CSS_SELECTOR, ".pagination-item.p-icon-arrow-left:not(.flip)")

#         # Click on the pagination button
#         next_button.click()

#         # Check if there is no "Next" button to exit the loop
#         if not driver.find_elements(By.CLASS_NAME, "pagination-item"):
#             break

# # Scrape data from the base URL
# scrape_data(base_url)

# # Close the webdriver
# driver.quit()


import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

# Initialize the Chrome webdriver
driver = webdriver.Chrome()

# Base URL of the webpage to scrape
base_url = "https://www.pacdora.com/dielines"

# Function to scroll to the bottom of the page
def scroll_to_bottom():
    # Scroll to the bottom of the page
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
    time.sleep(5)  # Add a short delay to allow the page to load more items

# Function to scrape data
def scrape_data(url):
    driver.get(url)

    # Scrape multiple pages
    while True:
        # Wait for the data to be loaded
        WebDriverWait(driver, 15).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "list-item")))

        # Scroll down multiple times until all items are loaded
        for _ in range(3):  # Adjust the range according to the number of times you need to scroll down
            scroll_to_bottom()

        # Find all list items
        items = driver.find_elements(By.CLASS_NAME, "list-item")

        # Open the CSV file in write mode with newline='' to prevent extra newline characters
        with open('scraped_data.csv', mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Mockup', 'Dieline', 'Description'])

            # Write data to CSV
            for item in items:
                # Find the image containers
                image_containers = item.find_elements(By.CLASS_NAME, "image-container")

                # Extract the image links
                mockup_link = image_containers[0].find_element(By.TAG_NAME, "img").get_attribute("src")
                dieline_link = image_containers[1].find_element(By.TAG_NAME, "img").get_attribute("src")

                # Extract the title
                title = item.find_element(By.CLASS_NAME, "title").text

                writer.writerow([mockup_link, dieline_link, title])

        # Find the pagination button without the "flip" class
        try:
            next_button = driver.find_element(By.CSS_SELECTOR, ".pagination-item.p-icon-arrow-left:not(.flip)")
            next_button.click()
            time.sleep(5)
        except:
            break  # If the next button is not found, exit the loop

# Scrape data from the base URL
scrape_data(base_url)

# Close the webdriver
driver.quit()
