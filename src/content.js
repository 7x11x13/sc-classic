// https://stackoverflow.com/a/61511955
function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElement(".billieEilishLogo").then((header) => {
  header.classList.remove("billieEilishLogo");
  for (const link of document.getElementsByTagName("link")) {
    if (link.href.includes("BillieEilish")) {
      link.href = "https://assets.web.soundcloud.cloud/_next/static/media/favicon.fd8d1612.ico";
    }
  }
})

function replaceLink(a) {
  a.href = "https://soundcloud.com";
  a.title = "Home";
  waitForElement(".header__logoLink-iconOnly:not([title='Home']").then(replaceLink);
}

function replaceWordmark(a) {
  a.title = "Home";
  waitForElement(".header__logoLink-wordmark:not([title='Home']").then(
    replaceWordmark
  );
}

waitForElement(".header__logoLink-iconOnly").then(replaceLink);
waitForElement(".header__logoLink-wordmark").then(replaceWordmark);