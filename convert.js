const fs = require("fs")

// 1. Load your JSON data
try {
  const rawData = fs.readFileSync("tabs.json", "utf8")
  const data = JSON.parse(rawData)

  const clientName = data.clientName || "Firefox Synced Tabs"
  const tabs = data.tabs || []

  // 2. HTML Boilerplate for Netscape Bookmark format
  let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="${Math.floor(Date.now() / 1000)}">${escapeHTML(
    clientName
  )}</H3>
    <DL><p>\n`

  // 3. Process each tab
  tabs.forEach((tab) => {
    const url = tab.urlHistory ? tab.urlHistory[0] : ""
    if (!url) return

    // Use title if exists, otherwise use URL
    const title = tab.title ? tab.title.trim() : url

    // lastUsed is preserved as ADD_DATE (expects Unix timestamp in seconds)
    const date = tab.lastUsed || Math.floor(Date.now() / 1000)

    html += `        <DT><A HREF="${url}" ADD_DATE="${date}">${escapeHTML(
      title
    )}</A>\n`
  })

  // 4. Close the tags
  html += `    </DL><p>\n</DL><p>`

  // 5. Save the file
  fs.writeFileSync("bookmarks_export.html", html)
  console.log(`✅ Success! Processed ${tabs.length} tabs.`)
  console.log(`📁 File saved as: bookmarks_export.html`)
} catch (err) {
  console.error("❌ Error processing file:", err.message)
}

// Function to make text "nice" and valid for HTML
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
