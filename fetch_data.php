<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "data_dashboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Construct SQL query with correct column names
$sql = "SELECT 
            end_year, 
            citylng, 
            citylat, 
            intensity, 
            sector, 
            topic, 
            insight, 
            swot, 
            url, 
            region, 
            start_year, 
            impact, 
            added, 
            published, 
            city, 
            country, 
            relevance, 
            pestle, 
            source, 
            title, 
            likelihood 
        FROM data_1";

$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>