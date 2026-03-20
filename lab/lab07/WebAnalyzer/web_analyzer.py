import requests
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/University_of_Calgary"

headers = {
"User-Agent": "lab07-web-analyzer"
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status() # Ensures the request was successful
    soup = BeautifulSoup(response.text, 'html.parser')
    print(f"Successfully fetched content from {url}")
except Exception as e:
    print(f"Error fetching content: {e}")


#3. Data Analysis
headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
headings_count = len(headings)
links = soup.find_all('a')
links_count = len(links)
paragraphs = soup.find_all('p')
paragraphs_count = len(paragraphs)
print(f"3. Data Analysis")
print(f"Number of headings (h1-h6): {headings_count}")
print(f"Number of links (<a>):      {links_count}")
print(f"Number of paragraphs (<p>):  {paragraphs_count}")

#4. Word Frequency Analysis
import re
text = soup.get_text()
text = text.lower()
words = re.findall(r'\b\w+\b', text)

word_freq = {}
for word in words:
    if word in word_freq:
        word_freq[word] += 1
    else:
        word_freq[word] = 1

print(f"\n4. Word Frequency Analysis")
sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
for word, freq in sorted_words[:5]:
    print(f"{word}: {freq}")

#5. Keyword Search
keyword = input("\n5. Keyword Search\nEnter a keyword to search for: ").lower()
keyword_count = word_freq.get(keyword, 0)
print(f"The keyword '{keyword}' appears {keyword_count} times in the webpage content.")

#6. Findin the Longest Paragraph 
longest_paragraph = ""
max_words = 0
for p in paragraphs:
    p_text = p.get_text()
    word_count = len(re.findall(r'\b\w+\b', p_text))
    if word_count > max_words and word_count >= 5:
        longest_paragraph = p_text
        max_words = word_count

print(f"\n6. Finding the Longest Paragraph")
print(f"Longest paragraph (word count: {max_words}):\n{longest_paragraph}")

#7. Visualizing Results
import matplotlib.pyplot as plt
labels = ['Headings', 'Links', 'Paragraphs']
values = [headings_count, links_count, paragraphs_count]
plt.bar(labels, values)
plt.title('Group 25')
plt.ylabel('Count')
#plt.savefig('web_analysis_results.png') # Save the figure as an image file
plt.show()