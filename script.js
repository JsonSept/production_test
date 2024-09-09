function calculateSolarEnergy() {
    // Get user inputs
    const solarIrradiance = parseFloat(document.getElementById("solarIrradiance").value);
    const panelArea = parseFloat(document.getElementById("panelArea").value);
    const panelEfficiency = parseFloat(document.getElementById("panelEfficiency").value) / 100;
    const batteryCapacity = parseFloat(document.getElementById("batteryCapacity").value);
    const batteryEfficiency = parseFloat(document.getElementById("batteryEfficiency").value) / 100;

    // Get selected inverter type and its efficiency
    const inverterSelect = document.getElementById("inverterType");
    const inverterEfficiency = parseFloat(inverterSelect.options[inverterSelect.selectedIndex].getAttribute('data-efficiency')) / 100;

    // Check if inputs are valid
    if (isNaN(solarIrradiance) || isNaN(panelArea) || isNaN(panelEfficiency) || isNaN(inverterEfficiency) || isNaN(batteryCapacity) || isNaN(batteryEfficiency)) {
        document.getElementById("result").innerHTML = "Please fill in all fields with valid numbers.";
        return;
    }

    // Solar energy production (kWh/day)
    const rawEnergyOutput = solarIrradiance * panelArea * panelEfficiency;
    const usableEnergy = rawEnergyOutput * inverterEfficiency;

    // Battery storage
    let batteryStorage = 0;
    if (usableEnergy > batteryCapacity) {
        batteryStorage = batteryCapacity;
    } else {
        batteryStorage = usableEnergy;
    }
    const actualStoredEnergy = batteryStorage * batteryEfficiency;

    // Display results
    document.getElementById("result").innerHTML = `
        <p><strong>Total Energy Output:</strong> ${usableEnergy.toFixed(2)} kWh/day</p>
        <p><strong>Stored Energy:</strong> ${actualStoredEnergy.toFixed(2)} kWh/day</p>
        <p><strong>Excess Energy:</strong> ${(usableEnergy - actualStoredEnergy).toFixed(2)} kWh/day</p>
        <p><strong>Inverter Type:</strong> ${inverterSelect.value} (${inverterEfficiency * 100}% efficiency)</p>
    `;
}
