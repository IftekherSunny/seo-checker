// dummy primary keyword. It'll come from user input
var primaryKeyword = ["test", "theme", "word"]

// messages store
var messages = []

// calling validating rules
messages = validateTitle(messages)

messages = validateMetaInformation(messages)

messages = validatePageElement(messages)

messages = validateImage(messages)

messages = validateSchema(messages)

messages = validateCanonical(messages)

messages = validateOnLoad(messages)


/**
 *
 * Validate title...
 *
 */
function validateTitle(messages) {

    // validating title
    if ($('title')[0].innerHTML.length > 55) {
        messages.push("Title langth must be less than 55 character")
    }

    if ($('title')[0].innerHTML.length < 1) {
        messages.push("Title can not be empty")
    }

    // validating primary keyword on page title
    $.each(primaryKeyword, function (index, keyword) {
        if ($("title")[0].innerHTML.indexOf(keyword) == -1) {
            messages.push("Primary keyword [ " + keyword + " ] does not exist in the title")
        }


        if (($("title")[0].innerHTML.match(new RegExp(keyword, "gi")) || []).length > 1) {
            messages.push("Primary keyword [ " + keyword + " ] can't be used more than onces")
        }
    })

    return messages
}


/**
 *
 * Validate meta information...
 *
 */
function validateMetaInformation(messages) {
    var metaDescription = $('meta[name=description]').attr("content");

    if (metaDescription.length < 20 || metaDescription.length > 160) {
        messages.push("Meta description should be between 20 character to 160 character")
    }

    if ((metaDescription.match(/"/g) || []).length > 0) {
        messages.push("Can't include double quotation marks in the meta description")
    }

    return messages
}

/**
 *
 * Validate page element...
 *
 */
function validatePageElement(messages) {

    // validating h1 tag
    if ($("h1").length == 0) {
        messages.push("Page element must have one h1 tag")
    }

    // validating h2 tag
    if ($("h2").length == 0) {
        messages.push("Page element having an h2 tag is better")
    }

    return messages
}

/**
 *
 * Validating image...
 *
 */
function validateImage(messages) {

    $.each($("img"), function (index, imageTag) {

        // validating img alt tag
        if (typeof $(this).attr('alt') == "undefined") {
            messages.push("Image source [ " + $(this).attr('src') + " ] must have alt tag")
        }

        // validating img alt tag length
        if ((typeof $(this).attr('alt') != "undefined") && ($(this).attr('alt').match(/\S+/g).length < 4)) {
            messages.push("Image source [ " + $(this).attr('src') + " ] alt tag must be > 3 words")
        }
    })

    return messages
}

/**
 *
 * Validating schema...
 *
 */
function validateSchema(messages) {

    // validating facebook graph meta
    if ($("meta[name*='og:']").length > 0) {
        messages.push("Markup: Facebook graph is good")
    } else {
        messages.push("Markup: It'll be better if you add facebook graph")
    }

    // validatin twitter card
    if ($("meta[name*='twitter:']").length > 0) {
        messages.push("Markup: Twitter card is good")
    } else {
        messages.push("Markup: It'll be better if you add twitter card")
    }

    return messages
}

/**
 *
 * Validating canonical link...
 *
 */
function validateCanonical(messages) {
    if ($("link[rel='canonical']").length == 0) {
        messages.push("Please add canonical link")
    }

    if (($("link[rel='canonical']").length > 0) && !$("link[rel='canonical']").attr("href")) {
        messages.push("Canonical link can't be empty")
    }

    return messages
}

/**
 *
 * Validating on load...
 *
 */
function validateOnLoad(messages) {

    window.onload = function () {

        // setup timer
        var now = new Date().getTime();
        var latency = now - start;

        var loadTime = ((latency % 60000) / 1000).toFixed(0);

        // push on load message based on load time
        if (loadTime < 1) {
            messages.push("Best load time")
        } else if (loadTime < 3) {
            messages.push("Better load time")
        } else if (loadTime < 6) {
            messages.push("Good load time")
        } else if (loadTime < 7) {
            messages.push("Bad load time")
        } else {
            messages.push("Worst load time")
        }

        // print out all validation error. always call it at the end of script
        $.each(messages, function (index, message) {
            console.log(message)
        })
    }
}
