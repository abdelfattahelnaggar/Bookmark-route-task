var bookmarks = [];
var siteName;
var siteURL;
var siteIndex;
var saveBtn = document.getElementById("newBkMrkBtn");
var bookmarksCounter = document.getElementById("bkmrksNum");
var bodyTable = document.getElementById("bookmarksList");

// ======================================================
// ============ Function to clear the inputs ============
// ======================================================
function clearInputs() {
  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
}
// =======================================================
// =================== Put the counter ===================
// =======================================================
function updateCounter() {
  bookmarksCounter.innerText = bookmarks.length || 0;
}
updateCounter();

// ======================================================
// Function to validate URL format
// ======================================================
function isUrlValid(url) {
  try {
    const newUrl = new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// ======================================================
// Function to add a new bookmark to the list
// ======================================================
saveBtn.addEventListener("click", function () {
  siteIndex = bookmarks.length;
  siteName = document.getElementById("siteName").value;
  siteURL = document.getElementById("siteURL").value;

  //---------------------- Check if inputs are empty ----------------------
  if (!siteName || !siteURL) {
    Swal.fire({
      title: "Error!",
      text: "Please fill in both the site name and URL",
      icon: "error",
      confirmButtonText: "Cool",
    });
    return;
  }
  //---------------------- Check if URL is valid ----------------------
  if (!isUrlValid(siteURL)) {
    Swal.fire({
      title: "Invalid URL Format!",
      text: "Please enter a valid URL format:\n• Must start with http:// or https://\n• Example: https://www.example.com",
      icon: "error",
      confirmButtonText: "Got it",
    });
    return;
  }
  //---------------------- Check if the bookmark already exists ----------------------
  for (let i = 0; i < bookmarks.length; i++) {
    var bookmarkName = bookmarks[i].name;
    if (bookmarkName.toLowerCase() === siteName.toLowerCase()) {
      Swal.fire({
        title: "Bookmark Already Exists!",
        text: "This bookmark already exists in your list.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  }
  // ---------------------- Push the bookmark to the list ----------------------
  bookmarks.push({
    bkmrkIdex: siteIndex,
    name: siteName,
    url: siteURL,
  });

  Swal.fire({
    title: "The bookmark has been added!",
    icon: "success",
    draggable: true,
  });
  addBookmark();
  updateCounter();
  clearInputs();
  console.log(bookmarks);
});

// ======================================================================================
// =================== Function to display the bookmarks in the table ===================
// ======================================================================================
function addBookmark() {
  bodyTable.innerHTML += `<tr>
      <th>${bookmarks.length}</th>
      <th>${siteName}</th>
      <th><a target='_blank' href='${siteURL}' class="btn btn-outline-primary">Visit</a></th>
      <th><button type="button" onclick="deleteBookmark('${siteIndex}')" class="btn btn-outline-danger">Delete</button></th>
    </tr>`;
}

// ======================================================================================
// =================== Function to delete a bookmark from the list ===================
// ======================================================================================
function deleteBookmark(bookmarkIndex) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      if (bookmarkIndex !== -1) {
        bookmarks.splice(bookmarkIndex, 1);
        displayBookmarks();
        updateCounter();
        console.log(bookmarks)
        Swal.fire("Deleted!", "Your bookmark has been deleted.", "success");
      }
    }
  });
}

// ======================================================================================
// =================== Function to display all bookmarks in the table ===================
// ======================================================================================
function displayBookmarks() {
  bodyTable.innerHTML = "";
  for (let index = 0; index < bookmarks.length; index++) {
    const bookmark = bookmarks[index];
    bodyTable.innerHTML += `<tr>
      <th>${index + 1}</th>
      <th>${bookmark.name}</th>
      <th><a type="button" target='_blank' href='${
        bookmark.url
      }' class="btn btn-outline-primary">Visit</a></th>
      <th><button type="button" onclick="deleteBookmark('${
        bookmark.name
      }')" class="btn btn-outline-danger">Delete</button></th>
    </tr>`;
  }
}
