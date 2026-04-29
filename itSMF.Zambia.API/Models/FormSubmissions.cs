using System;
using System.ComponentModel.DataAnnotations;

namespace itSMF.Zambia.API.Models
{
    public class MembershipApplication
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Organization { get; set; } = string.Empty;
        public string AdditionalInfo { get; set; } = string.Empty;
        public string SelectedPlan { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class BenchmarkingRegistration
    {
        public int Id { get; set; }
        public string OrganizationName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string WorkEmail { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class PartnershipApplication
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string OrganizationName { get; set; } = string.Empty;
        public string WorkEmail { get; set; } = string.Empty;
        public string PartnershipTier { get; set; } = string.Empty;
        public string StrategicGoals { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class SpeakerProposal
    {
        public int Id { get; set; }
        public string EventTitle { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PresentationTopic { get; set; } = string.Empty;
        public string Abstract { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class EventRegistration
    {
        public int Id { get; set; }
        public string EventTitle { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string AdditionalRequirements { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class PortalUser
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
