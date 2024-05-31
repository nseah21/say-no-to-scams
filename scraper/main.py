from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep

import csv
import sys

options = webdriver.ChromeOptions()
options.add_argument("--headless=chrome")
driver = webdriver.Chrome(options=options)
driver.get("https://scamalert.sg/stories")


def get_pages(start, end):
    with open("stories.csv", "a", newline="") as csvfile:
        writer = csv.writer(csvfile, delimiter=",", quoting=csv.QUOTE_MINIMAL)
        header = [
            "Victim",
            "Date",
            "Category",
            "Description",
            "Scam Alias",
            "Scam Source",
        ]
        writer.writerow(header)

        for page in range(start, end):
            print(f"pagingOnClick('{page}')")
            driver.execute_script(f"pagingOnClick('{page}')")
            sleep(10)

            table = driver.find_element(By.ID, "divStoryList")
            links = table.find_elements(By.TAG_NAME, "a")

            for link in links:
                try:
                    subdriver = webdriver.Chrome(options=options)
                    subdriver.get(link.get_attribute("href"))
                    victim, date = subdriver.find_element(
                        By.XPATH, "/html/body/main/div[1]/div/div/div/div/div/p"
                    ).text.split("|")
                    category = subdriver.find_element(
                        By.XPATH, "/html/body/main/div[2]/div/div[1]/a"
                    ).text
                    description = subdriver.find_element(
                        By.XPATH, "/html/body/main/div[2]/div/div[1]/div[1]"
                    ).text
                    name, contact = subdriver.find_element(
                        By.XPATH, "/html/body/main/div[2]/div/div[2]/div/div/p"
                    ).text.split("\n")
                    writer.writerow(
                        [victim, date, category, description, name, contact]
                    )
                    subdriver.quit()
                except Exception as e:
                    print(f"An error occurred: {e}. Skipping...")
                    subdriver.quit()


start, end = int(sys.argv[1]), int(sys.argv[2])
get_pages(start, end)
