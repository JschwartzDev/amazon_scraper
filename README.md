# amazon_scraper

DEPENDENCIES: mongoose, puppeteer

The program connects to a mongodb collection that is storing a card object for 10072 yugioh cards. After having connected
it will then loop through all the card objects in the collection, grab their name properties and format the name appropriately for
use in an amazon url.  Ideally the program would then take the first of the formatted names, open a headless browser with puppeteer, search the card on amazon and create a node list out of all the elements on the page that fit the querySelectorAll criteria.  

hopes and dreams - someday this program will search the first card, iterate through all pages of results and store all results in an array. then search the second card, iterate through all pages and push the results to said array... rinse and repeat.

key problem - When attempting to iterate through the list of names, the loop will continue to iterate before the promises are resolved. So if the first iteration opens a headless browser and searches the first card, the second iteration, and third and so on, will occur before the first promise has resolved/rejected.  
