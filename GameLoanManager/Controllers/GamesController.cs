using GameLoanManager.Domain.Entities;
using GameLoanManager.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

namespace GameLoanManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IMongoCollection<Game> _gameCollection;

        public GamesController(MongoDbContext context)
        {
            _gameCollection = context.Games;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var games = await _gameCollection.Find(game => true).ToListAsync();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _gameCollection.Find(game => game.Id == id).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        [HttpPost]
        public async Task<ActionResult<Game>> AddGame(Game game)
        {
            await _gameCollection.InsertOneAsync(game);
            return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(int id, Game updatedGame)
        {
            var game = await _gameCollection.Find(g => g.Id == id).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound();
            }

            updatedGame.Id = id;
            await _gameCollection.ReplaceOneAsync(g => g.Id == id, updatedGame);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _gameCollection.Find(g => g.Id == id).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound();
            }

            await _gameCollection.DeleteOneAsync(g => g.Id == id);
            return NoContent();
        }
    }
}
