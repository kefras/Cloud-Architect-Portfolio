"""Credential publication must require confirmed, complete public records."""

from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from components import credential_cards


class Credentials(unittest.TestCase):
    def record(self, **changes):
        return {
            "confirmed": True,
            "name": "Fixture <certificate>",
            "issuer": "Fixture issuer",
            "recipient": "Fixture recipient",
            "date": "2026",
            "kind": "Training badge",
            "verification_url": "https://issuer.example/verify/fixture",
            **changes,
        }

    def test_unconfirmed_record_cannot_be_published(self):
        result = credential_cards([self.record(confirmed=False)])
        self.assertNotIn("Verify credential", result)
        self.assertIn("credential-pending", result)

    def test_complete_confirmed_record_has_escaped_title_and_verification_link(self):
        result = credential_cards([self.record()])
        self.assertIn("Fixture &lt;certificate&gt;", result)
        self.assertIn('href="https://issuer.example/verify/fixture"', result)
        self.assertIn("Verify credential", result)

    def test_incomplete_or_non_https_records_fail_the_build(self):
        for changes in (
            {"issuer": ""},
            {"verification_url": "javascript:alert(1)"},
            {"verification_url": "https://user:pass@issuer.example/verify"},
        ):
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                credential_cards([self.record(**changes)])


if __name__ == "__main__":
    unittest.main()
