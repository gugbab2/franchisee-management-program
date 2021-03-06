package com.biz.fm.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RefreshToken {

	private String email;
    private String accessToken;
    private String refreshToken;
    private String refreshTokenExpirationAt;
}
