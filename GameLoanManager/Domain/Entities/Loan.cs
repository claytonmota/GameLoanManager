using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Text.Json.Serialization;

namespace GameLoanManager.Domain.Entities
{
    public class Loan
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonConverter(typeof(ObjectIdJsonConverter))]
        public ObjectId Id { get; set; }

        [BsonElement("friendId")]
        public String FriendId { get; set; }

        [BsonElement("gameId")]
        public int GameId { get; set; }

        [BsonElement("loanDate")]
        public DateTime LoanDate { get; set; }

        [BsonElement("returnDate")]
        public DateTime? ReturnDate { get; set; }
    }
}
