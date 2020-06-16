

function hasAccess(user_id,resource) {
    return user_id === resource.author_id
}

module.exports = hasAccess