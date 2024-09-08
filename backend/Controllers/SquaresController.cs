using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class SquaresController : ControllerBase
{
    private readonly string filePath = "squares.json";

    [HttpGet]
    public IActionResult GetSquares()
    {
        if (System.IO.File.Exists(filePath))
        {
            var json = System.IO.File.ReadAllText(filePath);
            var squares = JsonSerializer.Deserialize<List<Square>>(json);
            return Ok(squares);
        }
        return Ok(new List<Square>());
    }

    [HttpPost]
    public IActionResult SaveSquares([FromBody] List<Square> squares)
    {
        try
        {
            var json = JsonSerializer.Serialize(squares);
            System.IO.File.WriteAllText(filePath, json);
            Console.WriteLine($"Saved {squares.Count} squares to the file.");
            return Ok();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving squares: {ex.Message}");
            return StatusCode(500, "Error saving squares");
        }
    }
}

public class Square
{
    public int Id { get; set; }
    public string? Color { get; set; }
}