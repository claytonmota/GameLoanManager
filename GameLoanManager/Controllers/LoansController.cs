using GameLoanManager.Domain.Entities;
using GameLoanManager.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

namespace GameLoanManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly IMongoCollection<Loan> _loanCollection;
        private readonly IMongoCollection<Game> _gameCollection;
        private readonly IMongoCollection<Friend> _friendCollection;

        public LoansController(MongoDbContext context)
        {
            _loanCollection = context.Loans;
            _gameCollection = context.Games;
            _friendCollection = context.Friends;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            var loans = await _loanCollection.Find(loan => true).ToListAsync();
            return Ok(loans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(string id)
        {
            var loan = await _loanCollection.Find(loan => loan.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (loan == null)
            {
                return NotFound();
            }
            return Ok(loan);
        }

        [HttpPost]
        public async Task<ActionResult<Loan>> AddLoan(Loan loan)
        {
            var game = await _gameCollection.Find(game => game.Id == loan.GameId).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound("Game not found.");
            }

            var friend = await _friendCollection.Find(friend => friend.Id == new ObjectId(loan.FriendId)).FirstOrDefaultAsync();
            if (friend == null)
            {
                return NotFound("Friend not found.");
            }

            loan.LoanDate = DateTime.UtcNow;
            await _loanCollection.InsertOneAsync(loan);
            return CreatedAtAction(nameof(GetLoan), new { id = loan.Id }, loan);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLoan(string id, Loan updatedLoan)
        {
            var filter = Builders<Loan>.Filter.Eq(l => l.Id, ObjectId.Parse(id));
            var result = await _loanCollection.ReplaceOneAsync(filter, updatedLoan);

            if (result.MatchedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateReturnDate(string id, [FromBody] DateTime returnDate)
        {
            var filter = Builders<Loan>.Filter.Eq(l => l.Id, ObjectId.Parse(id));
            var update = Builders<Loan>.Update.Set(l => l.ReturnDate, returnDate);
            var result = await _loanCollection.UpdateOneAsync(filter, update);

            if (result.MatchedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(string id)
        {
            var loan = await _loanCollection.Find(loan => loan.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (loan == null)
            {
                return NotFound();
            }

            await _loanCollection.DeleteOneAsync(loan => loan.Id == new ObjectId(id));
            return NoContent();
        }
    }
}
