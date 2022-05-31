/*
  CUPERTINO by John Spahr
  (Analog Pebble face made with RockyJS)
*/
var rocky = require('rocky') //import rockyjs
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] //array containing days of week
var settings = null //create settings object

function fractionToRadian(fraction) {
    return fraction * 2 * Math.PI
}

function drawHand(ctx, centerX, centerY, angle, length, color) {
    // Find the end points
    var xEnd = centerX + Math.sin(angle) * length
    var yEnd = centerY - Math.cos(angle) * length

    // Configure how we want to draw the hand
    ctx.lineWidth = 8
    ctx.strokeStyle = color

    // Begin drawing
    ctx.beginPath()

    // Move to the center point, then draw the line
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(xEnd, yEnd)

    // Stroke the line (output to display)
    ctx.stroke()
}

rocky.on('draw', function(event) {
    var ctx = event.context //get graphics context
    var date = new Date() //create new date object

    //load default color values...
    var backgroundColor = 'black'
    var foregroundColor = 'white'
    var orbColor = 'white'
    var minuteColor = 'white'
    var hourColor = 'lightgray'
    var showDate = true
    var usDate = true
    var showLogo = true

    //if settings have loaded, fetch chosen colors...
    if (settings) {
        backgroundColor = cssColor(settings.backgroundColor)
        foregroundColor = cssColor(settings.foregroundColor)
        orbColor = cssColor(settings.orbColor)
        minuteColor = cssColor(settings.minuteColor)
        hourColor = cssColor(settings.hourColor)
        showDate = settings.showDate
        usDate = settings.usDate
        showLogo = settings.showLogo
    }

    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight) //reset canvas

    //draw background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)

    //draw 12 orb
    ctx.fillStyle = orbColor
    ctx.rockyFillRadial(ctx.canvas.clientWidth / 2, 5, 0, 9, 0, 2 * Math.PI)

    //switch to text markers
    ctx.fillStyle = foregroundColor
    ctx.font = '24px bold Gothic'

    //create 3 marker
    ctx.fillText(
        'III',
        ctx.canvas.clientWidth - ctx.measureText('III').width - 5,
        ctx.canvas.clientHeight / 2 - ctx.measureText('III').height / 2 - 5
    )

    //create 6 marker
    ctx.fillText(
        'VI',
        (ctx.canvas.clientWidth - ctx.measureText('VI').width) / 2,
        ctx.canvas.clientHeight - ctx.measureText('VI').height - 5
    )

    //create 9 marker
    ctx.fillText(
        'IX',
        5,
        ctx.canvas.clientHeight / 2 - ctx.measureText('IX').height / 2 - 5
    )

    ctx.font = '14px Gothic' //update font

    //display Pebble logo if setting enabled
    if (showLogo) {
        ctx.fillText(
                'Pebble',
                (ctx.canvas.clientWidth - ctx.measureText('Pebble').width) / 2,
                20
            ) //draw logo at top of screen
    }

    //display date if setting enabled
    if (showDate) {
        var monthDate = date.getMonth() + 1 + '/' + date.getDate() //get month/day

        if (!usDate) {
            monthDate = date.getDate() + '/' + (date.getMonth() + 1) //if not set to US date format, display day/month
        }

        var fullDate = days[date.getDay()] + ' ' + monthDate //add day of week to beginning of date determined above
        ctx.fillText(
                fullDate,
                (ctx.canvas.clientWidth - ctx.measureText(fullDate).width) / 2,
                ctx.canvas.clientHeight - 40
            ) //draw date at bottom of screen
    }

    // Determine the width and height of the display
    var unWidth = ctx.canvas.unobstructedWidth
    var unHeight = ctx.canvas.unobstructedHeight

    // Determine the center point of the display
    // and the max size of watch hands
    var centerX = unWidth / 2
    var centerY = unHeight / 2

    // -40 so we're inset 20px on each side
    var maxLength = (Math.min(unWidth, unHeight) - 40) / 2

    // Calculate the minute hand angle
    var minuteFraction = date.getMinutes() / 60
    var minuteAngle = fractionToRadian(minuteFraction)

    // Draw the minute hand
    drawHand(ctx, centerX, centerY, minuteAngle, maxLength, minuteColor)

    // Calculate the hour hand angle
    var hourFraction = ((date.getHours() % 12) + minuteFraction) / 12
    var hourAngle = fractionToRadian(hourFraction)

    // Draw the hour hand
    drawHand(ctx, centerX, centerY, hourAngle, maxLength * 0.6, hourColor)
})

rocky.on('secondchange', function(event) {
    // Request the screen to be redrawn on next pass
    rocky.requestDraw()
})

rocky.on('message', function(event) {
    //update settings when received
    settings = event.data
})

rocky.postMessage({ command: 'settings' })

// Borrowed from Clay.js

/**
 * @param {string|boolean|number} color
 * @returns {string}
 */
function cssColor(color) {
    if (typeof color === 'number') {
        color = color.toString(16)
    } else if (!color) {
        return 'transparent'
    }

    color = padColorString(color)

    return '#' + color
}

/**
 * @param {string} color
 * @return {string}
 */
function padColorString(color) {
    color = color.toLowerCase()

    while (color.length < 6) {
        color = '0' + color
    }

    return color
}