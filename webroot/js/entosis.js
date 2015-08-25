// ---------------------------------------------------------------

var indexStrategic = 0;
var indexMilitary = 0;
var indexIndustrial = 0;
var designatedCapital = 0;

var militaryLookup = [0.0, 0.6, 1.2, 1.7, 2.1, 2.5];
var industrialLookup = [0.0, 0.6, 1.2, 1.7, 2.1, 2.5];
var strategicLookup = [0.0, 0.4, 0.6, 0.8, 0.9, 1.0];

var cycle_t1 = 5.0;
var cycle_t2 = 2.0;
var cycle_capital_ship = 5.0;
var index_capital_system = 2.0;
var vulnMax = 18.0;

// ---------------------------------------------------------------

$(document).ready(function() {
    $("#time-subcap-warmup-1").html(cycle_t1 + "m");
    $("#time-subcap-warmup-2").html(cycle_t2 + "m");

    $("#time-capital-warmup-1").html(cycle_t1 * cycle_capital_ship + "m");
    $("#time-capital-warmup-2").html(cycle_t2 * cycle_capital_ship + "m");

    readjust();
});

// ---------------------------------------------------------------

function hourtohuman(hour) {
    h = Math.floor(hour);
    m = Math.floor(60 * (hour - h));
    if (m == 0) {
	return h + "h";
    }
    return h + "h " + m  + "m";
}

function toggleDesignatedCapital() {
    if (designatedCapital == 0) {
	designatedCapital = index_capital_system;
    } else {
	designatedCapital = 0;
    }
    readjust();
}

function readjust(multiplier) {

    if (multiplier != undefined) {
	multiplier = new Number(multiplier);

	indexStrategic = 0;
	indexMilitary = 0;
	indexIndustrial = 0;
	designatedCapital = 0;
    }

    for (i=0; i <= 5; i++) {
	$("#option-index-strategic-" + i).removeClass('btn-primary');
	$("#option-index-military-" + i).removeClass('btn-primary');
	$("#option-index-industrial-" + i).removeClass('btn-primary');
    }
    $("#option-designated-capital").removeClass('btn-primary');

    if (multiplier == undefined) {
	for (i=0; i <= 5; i++) {
	    if (i <= indexStrategic) $("#option-index-strategic-" + i).addClass('btn-primary');
	    if (i <= indexMilitary) $("#option-index-military-" + i).addClass('btn-primary');
	    if (i <= indexIndustrial) $("#option-index-industrial-" + i).addClass('btn-primary');
	}
	if (designatedCapital != 0) $("#option-designated-capital").addClass('btn-primary');

	multiplier = Math.min(6.0, (1.0 + designatedCapital + militaryLookup[indexMilitary] + industrialLookup[indexIndustrial] + strategicLookup[indexStrategic]));
	$("#slider-multiplier").val(multiplier);
    }

    $("#slider-multiplier-value").html(multiplier.toFixed(1) + "x");
    $("#time-station").html(+(4.0 * multiplier).toFixed(2) + "m");
    $("#time-structure").html(+(10.0 * multiplier).toFixed(2) + "m");
    $("#time-vuln").html(hourtohuman(vulnMax / multiplier));
}

// ---------------------------------------------------------------
