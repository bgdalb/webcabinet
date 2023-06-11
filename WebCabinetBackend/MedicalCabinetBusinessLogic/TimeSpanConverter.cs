using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MedicalCabinetBusinessLogic.Converters
{
    public class TimeSpanConverter : JsonConverter<TimeSpan>
    {
        public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                var jsonObject = JsonSerializer.Deserialize<JsonElement>(ref reader);
                var hours = jsonObject.GetProperty("hours").GetInt32();
                var minutes = jsonObject.GetProperty("minutes").GetInt32();
                var seconds = jsonObject.GetProperty("seconds").GetInt32();

                return new TimeSpan(hours, minutes, seconds);
            }

            throw new JsonException();
        }

        public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
