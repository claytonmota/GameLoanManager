using GameLoanManager.Domain.Entities;
using GameLoanManager.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

namespace GameLoanManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IMongoCollection<Friend> _friendCollection;

        public FriendsController(MongoDbContext context)
        {
            _friendCollection = context.Friends;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friend>>> GetFriends()
        {
            var friends = await _friendCollection.Find(friend => true).ToListAsync();
            return Ok(friends);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Friend>> GetFriend(string id)
        {
            var friend = await _friendCollection.Find(friend => friend.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (friend == null)
            {
                return NotFound();
            }
            return Ok(friend);
        }

        [HttpPost]
        public async Task<ActionResult<Friend>> AddFriend(Friend friend)
        {
            await _friendCollection.InsertOneAsync(friend);
            return CreatedAtAction(nameof(GetFriend), new { id = friend.Id }, friend);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFriend(string id, Friend updatedFriend)
        {
            var friend = await _friendCollection.Find(f => f.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (friend == null)
            {
                return NotFound();
            }

            updatedFriend.Id = new ObjectId(id);
            await _friendCollection.ReplaceOneAsync(f => f.Id == new ObjectId(id), updatedFriend);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriend(string id)
        {
            var friend = await _friendCollection.Find(f => f.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (friend == null)
            {
                return NotFound();
            }

            await _friendCollection.DeleteOneAsync(f => f.Id == new ObjectId(id));
            return NoContent();
        }
    }
}
