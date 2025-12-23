# **Firefox Synced Tabs to Bookmarks Converter**

A lightweight Node.js utility to transform raw JSON data from Firefox’s internal Sync records into a valid Netscape-formatted HTML bookmark file.

## **The Problem**

When you have hundreds (or thousands) of synced tabs on a mobile device and want to archive them to your desktop, Firefox's only native option is **"Open All in Tabs."** For a large volume of tabs, this is a nightmare: it can crash your browser, consume massive amounts of RAM, and creates a chaotic workspace.

## **The Solution**

This script parses raw data records from Firefox Sync and generates a standalone .html bookmark file. You can import this file directly into your Firefox Library.

- **Zero browser bloat**: No need to actually "open" the tabs.
- **Data Integrity**: Preserves the "Last Used" timestamp and sanitizes page titles.
- **Efficiency**: Handles thousands of links in milliseconds.

## **1\. Prerequisites**

### **Install the "About Sync" Add-on**

To access the raw tab data, you need the official developer-oriented add-on from Mozilla.

1. Install [**About Sync**](https://addons.mozilla.org/en-US/firefox/addon/about-sync/).
2. Once installed, navigate to about:sync in your address bar.

## **2\. How to get your tabs.json**

The browser doesn't make this easy, so follow these steps carefully to avoid truncated data:

1. Navigate to about:sync.
2. Find the **Collections** list and click on **Tabs**.
3. Locate the **Record Editor (server)** button and click it.
4. In the **Select record** dropdown, choose your target device (e.g., _Firefox on samsung SM-S938B_).
5. **CRITICAL: Avoid Truncation.** Firefox often replaces long lists with ... (ellipsis) in the UI.
   - Click inside the JSON text area.
   - **Scroll all the way to the bottom** of the box. This forces the editor to render the full text into memory.
   - Press Ctrl \+ A (Select All) and Ctrl \+ C (Copy).
6. Create a file named tabs.json in the root of this project and paste the content.

## **3\. Usage**

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository and place your tabs.json in the root folder.
3. Run the conversion script:  
   npm run start

   _Note: This is mapped to node convert.js in your package.json._

A file named bookmarks_export.html will be generated in the root directory.

## **4\. Importing to Firefox**

1. Open Firefox and press Ctrl \+ Shift \+ O (or Cmd \+ Shift \+ O on Mac) to open the **Library**.
2. Click **Import and Backup** in the top toolbar.
3. Select **Import Bookmarks from HTML...**.
4. Choose the bookmarks_export.html file.
5. Your tabs will appear in a new folder named after your device (e.g., "Firefox on samsung SM-S938B").

## **Technical Details**

- **Timestamp Preservation**: The script maps the lastUsed JSON property to the HTML ADD_DATE attribute.
- **Character Encoding**: Uses UTF-8 and handles HTML entity escaping for titles containing symbols like &, \<, or \>.
- **Netscape Format**: Follows the legacy [Netscape Bookmark File Format](<https://www.google.com/search?q=https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v%3Dvs.85)>) which is the universal standard for browser imports.
