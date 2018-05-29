package library.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import library.service.security.UserDetailsService;

/**
 * Created by Paul on 01/05/2018.
 */
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    static final String TOKEN_HEADER="Authorization";

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader(TOKEN_HEADER);
        if(token!=null){
            token = token.replace("Bearer ", "");
        }

        String username = this.jwtUtils.getUsernameFromToken(token);

        // Valid username and no authentication already in place
        //&& SecurityContextHolder.getContext().getAuthentication()==null
        if(username != null ){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if(this.jwtUtils.validateToken(token, userDetails)){
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request,response);
    }




}
